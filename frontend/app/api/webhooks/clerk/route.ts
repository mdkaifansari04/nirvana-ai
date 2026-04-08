'use server';

import { ApiError, services, toErrorPayload } from '@/lib/server';
import { type WebhookEvent, clerkClient } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

export async function POST(req: Request) {
   const SIGNING_SECRET = process.env.SIGNING_SECRET;

   if (!SIGNING_SECRET) {
      throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
   }

   // Create new Svix instance with secret
   const wh = new Webhook(SIGNING_SECRET);

   // Get headers
   const headerPayload = await headers();
   const svix_id = headerPayload.get('svix-id');
   const svix_timestamp = headerPayload.get('svix-timestamp');
   const svix_signature = headerPayload.get('svix-signature');

   // If there are no headers, error out
   if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error: Missing Svix headers', {
         status: 400,
      });
   }

   // Get body
   const payload = await req.json();
   const body = JSON.stringify(payload);

   let evt: WebhookEvent;

   // Verify payload with headers
   try {
      evt = wh.verify(body, {
         'svix-id': svix_id,
         'svix-timestamp': svix_timestamp,
         'svix-signature': svix_signature,
      }) as WebhookEvent;
   } catch (err) {
      console.error('Error: Could not verify webhook:', err);
      return new Response('Error: Verification error', {
         status: 400,
      });
   }

   // Do something with payload
   // For this guide, log payload to console
   const { id } = evt.data;
   const eventType = evt.type;

   if (eventType === 'user.created') {
      try {
         const { first_name, last_name, email_addresses, id } = evt.data;
         const primaryEmail = email_addresses[0]?.email_address;

         if (!primaryEmail) {
            throw new ApiError('Primary email is required', 400);
         }

         const payload = {
            clerkId: id,
            email: primaryEmail,
            name: `${first_name ?? ''} ${last_name ?? ''}`.trim(),
         } as Parameters<typeof services.userService.createUser>[0];

         const result = await services.userService.createUser(payload);
         const user = result.data;

         if (user?._id) {
            const client = await clerkClient();
            await client.users.updateUserMetadata(id, {
               publicMetadata: {
                  userId: user._id.toString(),
                  onBoarded: false,
               },
            });
         }

         return NextResponse.json({
            message: 'User created successfully',
            user,
         });
      } catch (error) {
         const payload = toErrorPayload(error);
         return NextResponse.json(payload.body, { status: payload.status });
      }
   }

   console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
   console.log('Webhook payload:', body);

   return new Response('Webhook received', { status: 200 });
}
