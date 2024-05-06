import { StateManagementComponent } from "@/src/2_StateManagementComponent";

export const HelloWorldComponent = (props) => {
  return (
    <div
      className="p-10 border-2 rounded border-black"
      // style={{ padding: 10, borderColor: "red", borderWidth: 1 }}
    >
      <p>Hiii World</p>
      <h1>This is H1</h1>
      <StateManagementComponent />
    </div>
  );
};
