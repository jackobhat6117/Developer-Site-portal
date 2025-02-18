import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>
const testReacHookForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
        email: "",

    },
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("daa", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", {
            required: "Email is required!",
            validate: (value) => {
              if (!value.includes("@")) {
                return "Email must include @";
              }
              return true;
            },
          })}
          type="text"
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "password must have at least 8 characters",
            },
          })}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.password && <span>{errors.password?.message}</span>}
      </form>
    </div>
  );
};

export default testReacHookForm;
