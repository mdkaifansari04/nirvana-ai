import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { Loader2, TriangleAlertIcon } from 'lucide-react';

interface QueryWrapperProps {
   data: unknown;
   isPending: boolean;
   isLoading?: boolean;
   isError: boolean;
   error: unknown;
   view: React.ReactNode;
   pendingView?: React.ReactNode;
   className?: string;
   emptyDataView?: React.ReactNode;
}
/* prettier-ignore */
export default function QueryWrapper(props: QueryWrapperProps) {
   const canShowData = !props.isError && !props.error && !props.isPending && props.data;
   const showError = props.isError && !props.isPending && props.error;
   const showDefaultPendingView = (props.isPending && !props.pendingView) || props.isLoading;
   // prettier-ignore
   const showEmptyData = (!props.data && props.emptyDataView && !props.isPending) || (Array.isArray(props.data) && props.data?.length === 0 && props.emptyDataView && !props.isPending);

   return (
      <AnimatePresence mode="wait">
         {canShowData ? <div className={props.className}>{props.view}</div> : null}
         {showError && props.error ? 
            <QueryErrorIndicator errorMessage={props.error instanceof Error ? props.error.message : String(props.error)} /> 
            : null
         }
         {props.isPending && (showDefaultPendingView ? <DefaultLoader /> : props.pendingView)}
         {showEmptyData && props.emptyDataView}
      </AnimatePresence>
   );
}

function DefaultLoader() {
   return (
      <div className="flex items-center justify-center w-full">
         <Loader2 className="w-3 h-3 animate-spin" />
      </div>
   );
}

function QueryErrorIndicator(props: { errorMessage?: string }) {
   return (
      <div className="flex flex-col items-center justify-center w-full gap-3 text-red-600">
         <TriangleAlertIcon className="w-10 h-10" />
         <p className="text-sm font-normal tracking-tighter">{props.errorMessage ? props.errorMessage : 'Something went wrong'}</p>
      </div>
   );
}

export function MainSectionWrapper(props: { children: React.ReactNode; className?: string }) {
   return <main className={cn('w-full h-screen p-4 overflow-y-auto', props.className)}>{props.children}</main>;
}
