// import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

// export function MaxCharacters(limit: number, validationOptions?: ValidationOptions) {
//     return function (object: Record<string, any>, propertyName: string): void {
//         registerDecorator({
//             name: 'maxCharacters',
//             target: object.constructor,
//             propertyName: propertyName,
//             constraints: [limit],
//             options: validationOptions,
//             validator: {
//                 validate(value: any, args: ValidationArguments) {
//                     if (typeof value !== 'string') {
//                         return false;
//                     }

//                     // Remove spaces from the new value
//                     const newValueWithoutSpaces = value.replace(/\s/g, '');

//                     // Check if the length of the new value (excluding spaces) exceeds the limit
//                     return newValueWithoutSpaces.length <= args.constraints[0];
//                 },
//                 defaultMessage(args: ValidationArguments) {
//                     const limit = args.constraints[0];
//                     return `Exceeded maximum character limit of ${limit} characters in ${args?.property} field`;
//                 },
//             },
//         });
//     };
// }
