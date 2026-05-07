import { Injectable } from '@angular/core';

/** 
 * Service for resolving chart colors based on Tailwind CSS classes. 
 **/

@Injectable({
  providedIn: 'root'
})
export class ChartColorService {

  private cache = new Map<string, string>();

  get(className: string): string {
    if (this.cache.has(className)) {
      return this.cache.get(className)!;
    }

    const color = this.resolveColor(className);
    this.cache.set(className, color);

    return color;
  }

  private resolveColor(className: string): string {
    const el = document.createElement('div');
    el.className = className;

    el.style.position = 'absolute';
    el.style.visibility = 'hidden';

    document.body.appendChild(el);

    const color = getComputedStyle(el).backgroundColor;

    document.body.removeChild(el);

    return color;
  }

  clearCache(): void {
    this.cache.clear();
  }
}