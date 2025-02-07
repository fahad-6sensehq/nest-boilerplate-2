// import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

// @ValidatorConstraint({ name: 'isEndDateBeforeStartDate', async: false })
// export class IsEndDateBeforeStartDateValidator implements ValidatorConstraintInterface {
//     validate(endDate: string, args: ValidationArguments): boolean {
//         const { startDate } = args.object as any;
//         const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

//         if (!isoDateRegex.test(startDate) || !isoDateRegex.test(endDate)) {
//             return false;
//         }

//         if (!endDate || !startDate) {
//             return false;
//         }

//         const endDateTimestamp = new Date(endDate).getTime();
//         const startDateTimestamp = new Date(startDate).getTime();

//         return endDateTimestamp > startDateTimestamp;
//     }

//     defaultMessage(): string {
//         return `End Date must be greater the Start Date`;
//     }
// }
