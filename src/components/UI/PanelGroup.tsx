type PanelGroupProps = {
  title: string;
};
const PanelGroup: React.FC<PanelGroupProps> = function ({ title, children }) {
  return (
    <div className=" ">
      <h1 className="px-2 py-3 bg-gray-600">{title}</h1>
      <div className="my-2 px-2 "> {children}</div>
    </div>
  );
};
export default PanelGroup;
