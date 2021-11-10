type MenuIcon = {
  onClick: () => void;
};
const MenuIcon = ({ onClick }: MenuIcon) => {
  return (
    <div className={"text-red-700 absolute top-2 left-2"}>
      <svg
        width={30}
        height={30}
        onClick={onClick}
        xmlns-dc="http://purl.org/dc/elements/1.1/"
        xmlns-cc="http://creativecommons.org/ns#"
        xmlns-rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns-svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns-sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlns-inkscape="http://www.inkscape.org/namespaces/inkscape"
        viewBox="0 0 1280 1280"
        x="0px"
        y="0px"
      >
        <g transform="translate(1837.1429,-303.79083)">
          <path
            d="m -1837.1429,943.79083 0,-640 640,0 639.99999,0 0,640 0,639.99997 -639.99999,0 -640,0 0,-639.99997 z m 928.19749,287.38267 c 0.4647,-0.752 0.4284,-28.0332 -0.081,-60.625 l -0.9259,-59.2577 -287.19069,0 -287.1908,0 -0.9258,59.2577 c -0.5093,32.5918 -0.5456,59.873 -0.081,60.625 1.2024,1.9456 575.19249,1.9456 576.39489,0 z m -0.072,-257.38267 c 0.5053,-16.5 0.5053,-43.5 0,-60 l -0.9187,-30 -287.20629,0 -287.2063,0 -0.9187,30 c -0.5053,16.5 -0.5053,43.5 0,60 l 0.9187,29.99997 287.2063,0 287.20629,0 0.9187,-29.99997 z m -0.625,-212.92059 c 0,-8.48132 0.3724,-35.76257 0.8277,-60.625 l 0.8276,-45.20441 -289.15529,0 -289.1553,0 0.8276,45.20441 c 0.4552,24.86243 0.8277,52.14368 0.8277,60.625 l 0,15.42059 287.5,0 287.49999,0 0,-15.42059 z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
};
export default MenuIcon;
