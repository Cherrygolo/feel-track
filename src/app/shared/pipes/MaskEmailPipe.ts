import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to mask email addresses, showing only the first two characters of the username 
 * and masking the rest with asterisks.
 */

@Pipe({
  name: 'maskEmail',
  pure: true
})
export class MaskEmailPipe implements PipeTransform {

  transform(email: string | null | undefined): string {
    if (!email) return '';

    const [name, domain] = email.split('@');

    if (!domain) return email;

    const visible = name.slice(0, 2);
    const masked = '*'.repeat(Math.max(name.length - 2, 0));

    return `${visible}${masked}@${domain}`;
  }

}