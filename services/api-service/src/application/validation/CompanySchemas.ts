import { z } from 'zod';
import { CompanyStatus } from '../../domain/entities/Company';

export const CompanySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2).max(100),
  tradingName: z.string().min(2).max(100),
  cnpj: z.string().length(14),
  email: z.string().email(),
  phone: z.string().min(10).max(11),
  status: z.enum([
    CompanyStatus.ACTIVE,
    CompanyStatus.INACTIVE,
    CompanyStatus.PENDING,
    CompanyStatus.SUSPENDED,
  ]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateCompanySchema = CompanySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateCompanyInput = z.infer<typeof CreateCompanySchema>;

export const UpdateCompanySchema = CompanySchema.partial().omit({
  id: true,
  cnpj: true,
  createdAt: true,
  updatedAt: true,
});

export type UpdateCompanyInput = z.infer<typeof UpdateCompanySchema>;

export const CompanyQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  status: z
    .enum([
      CompanyStatus.ACTIVE,
      CompanyStatus.INACTIVE,
      CompanyStatus.PENDING,
      CompanyStatus.SUSPENDED,
    ])
    .optional(),
});

export type CompanyQueryInput = z.infer<typeof CompanyQuerySchema>;
