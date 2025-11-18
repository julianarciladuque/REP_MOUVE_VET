import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PatientClient {
  private baseUrl = 'http://localhost:3006';

  constructor(private readonly http: HttpService) {}

  async getPatients(token: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    return res.data;
  }

  async getPatientByCedula(cedula: string, token: string) {
    try {
      const res = await firstValueFrom(
        this.http.get(`${this.baseUrl}/admin/cedula/${cedula}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return res.data;
  
    } catch (err) {
  
      if (err.response?.status === 404) {
        throw new NotFoundException('Paciente no encontrado en PostgreSQL');
      }
  
      // Otros errores → 500
      throw new InternalServerErrorException('Error consultando paciente en PostgreSQL');
    }
  }
  

  async getPatientById(id: string, token: string) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}/admin/id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    return res.data;
  }
}
