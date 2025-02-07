// import {
//     registerDecorator,
//     ValidationOptions,
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
// } from 'class-validator';

// @ValidatorConstraint({ name: 'isPositive', async: false })
// export class IsPositiveConstraint implements ValidatorConstraintInterface {
//     validate(value: any): boolean {
//         return value >= 0;
//     }

//     defaultMessage(): string {
//         return 'Rate must be greater than or equal to zero';
//     }
// }

// export function IsPositiveInteger(validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string) {
//         registerDecorator({
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             constraints: [],
//             validator: IsPositiveConstraint,
//         });
//     };
// }
