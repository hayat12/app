import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { QueryEncoder } from '@angular/http';
@Injectable()
export class CustomencoderProvider extends QueryEncoder{
  encodeKey(k: string): string {
    k = super.encodeKey(k);
    return k.replace(/\+/gi, '%2B');
}
encodeValue(v: string): string {
    v = super.encodeValue(v);
    return v.replace(/\+/gi, '%2B');
}
}
