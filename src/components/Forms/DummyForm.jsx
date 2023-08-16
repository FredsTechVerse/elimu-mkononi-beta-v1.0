import { useForm } from "react-hook-form";

export default function DummyForm() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      example: "Example Input",
      exampleRequired: "Example Required Input",
    },
  });

  //   Declaring default values gives us implicit type checking with typescript.
  const onSubmit = (data) => {
    console.log(data);
    console.log("Will it submit with the errors");
  };

  //   console.log(watch("example")); // watch input value by passing the name of it
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input
        {...register("example", {
          required: "This is required",
          minLength: {
            value: 4,
            message: "Must be greater than 4 characters",
          },
        })}
        placeholder="example"
      />
      {errors.exampleRequired && (
        <p className="bg-red-300 text-red-800 w-48 rounded-full text-center px-2 text-sm m-2">
          {errors.example?.message}
        </p>
      )}

      {/* include validation with required or other standard HTML validation rules */}
      <input
        {...register("exampleRequired", {
          required: "This example  required is required ",
          minLength: {
            value: 4,
            message: "Must be greater than 4 characters",
          },
          maxLength: {
            value: 10,
            message: "Should not exceed 10 characters",
          },
        })}
        placeholder="Example required"
      />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && (
        <p className="bg-red-300 text-red-800 w-64 rounded-full text-center px-2 text-sm m-2">
          {errors.exampleRequired?.message}
        </p>
      )}

      <input type="submit" />
    </form>
  );
}
