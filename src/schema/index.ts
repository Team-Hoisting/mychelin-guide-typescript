import z from 'zod';

const nicknameSchema = z.object({
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }).max(8, { message: '최대 8글자까지 가능합니다.' }),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(1, '패스워드를 입력해 주세요')
      .regex(/^[A-Za-z0-9]{6,20}$/, { message: '영문 또는 숫자를 6~20자 입력하세요.' }),
    confirmPassword: z.string().min(1, { message: '패스워드를 확인해 주세요' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '패스워드가 일치하지 않습니다.',
  });

const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해 주세요' })
    .email({ message: '이메일 형식에 맞게 입력해주세요.' }),
  password: z
    .string()
    .min(1, '패스워드를 입력해 주세요')
    .regex(/^[A-Za-z0-9]{6,20}$/, { message: '영문 또는 숫자를 6~20자 입력하세요.' }),
});

const signupSchema = signinSchema
  .and(
    z.object({
      nickname: z
        .string()
        .min(1, { message: '닉네임을 입력해주세요.' })
        .max(8, { message: '최대 8글자까지 가능합니다.' }),
      confirmPassword: z.string().min(1, { message: '패스워드를 확인해 주세요' }),
    })
  )
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '패스워드가 일치하지 않습니다.',
  });

export { nicknameSchema, passwordSchema, signinSchema, signupSchema };
