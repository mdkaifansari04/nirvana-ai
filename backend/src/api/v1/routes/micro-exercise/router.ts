import { Router } from 'express';
import { microExerciseController as ME } from '../../controller';
import { microExerciseValidation } from '../../../../validation/micro-exercise-validation';

const microExerciseRouter = Router({ mergeParams: true });

microExerciseRouter.get('/', ME.getMicroExercises);
microExerciseRouter.get('/:microExerciseId', ME.getMicroExercise);
microExerciseRouter.post('/', microExerciseValidation, ME.saveMicroExercise);
microExerciseRouter.delete('/:microExerciseId', ME.deleteMicroExercise);
microExerciseRouter.post('/generate', ME.generateMicroExercise);

export default microExerciseRouter;
