import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class InventoryClient {
  private baseUrl = 'http://localhost:3004';

  constructor(private readonly http: HttpService) {}

  async getMedicamentos(token: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/medications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    return res.data;
  }

  async getProcedimientos(token: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/procedure`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    return res.data;
  }

  async getAyudasDiagnosticas(token: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/diagnostic`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    return res.data;
  }
}
