import * as React from "react";

interface State {
  name: string;
}
interface Props {
  onSubmit: (formValues: State) => void;
}

const Form: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = React.useState<string>("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setName(value);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        onSubmit({ name });
      }}
    >
      <h3>Create Blog</h3>
      <input
        name="name"
        placeholder="name"
        value={name}
        onChange={handleChange}
      />
      <button type="submit">save</button>
    </form>
  );
};

export default Form;
