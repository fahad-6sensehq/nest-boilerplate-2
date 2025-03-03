import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';

export function IsValidEmail(
    validationOptions?: ValidationOptions,
): (object: Record<string, any>, propertyName: string) => void {
    return (object: Record<string, any>, propertyName: string) => {
        registerDecorator({
            name: 'IsValidEmail',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                async validate(value: any): Promise<boolean> {
                    if (!value.includes('@')) {
                        return false;
                    }

                    return true;
                },

                defaultMessage(args: ValidationArguments): string {
                    return `${args.property} is not a valid email address`;
                },
            },
        });
    };
}
