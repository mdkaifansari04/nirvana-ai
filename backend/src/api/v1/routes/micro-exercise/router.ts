import { Router } from 'express';
import { microExerciseController as ME } from '../../controller';
import { microExerciseValidation } from '../../../../validation/micro-exercise-validation';
import { userIdValidation } from '../../../../validation/user-id-validation';

const microExerciseRouter = Router();

microExerciseRouter.get('/', ME.getMicroExercises);
microExerciseRouter.get('/:microExerciseId', ME.getMicroExercise);
microExerciseRouter.post('/', microExerciseValidation, ME.saveMicroExercise);
microExerciseRouter.delete('/:microExerciseId', userIdValidation, ME.deleteMicroExercise);
microExerciseRouter.post('/generate', ME.generateMicroExercise);

export default microExerciseRouter;
