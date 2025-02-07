// import { registerDecorator, ValidationOptions } from 'class-validator';

// export function isValidEinOrEmpty(
//     validationOptions?: ValidationOptions
// ): (object: Record<string, any>, propertyName: string) => void {
//     return (object: Record<string, any>, propertyName: string) => {
//         registerDecorator({
//             name: 'isValidEinOrEmpty',
//             target: object.constructor,
//             propertyName: propertyName,
//             constraints: [],
//             options: validationOptions,
//             validator: {
//                 validate(value: any): boolean {
//                     if (value === '') {
//                         return true;
//                     }

//                     if (typeof value === 'string') {
//                         const einRegex = /^[0-9]{9}$/;
//                         return einRegex.test(value);
//                     }

//                     return false;
//                 },
//                 defaultMessage(): string {
//                     return 'ein must be empty or a 9 digit character';
//                 },
//             },
//         });
//     };
// }
