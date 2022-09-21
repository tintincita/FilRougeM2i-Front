// @ts-ignore: Object is possibly 'null'.
// @ts-nocheck
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';


import {Header} from "../components/header/header.component";

describe("<Header />", () => {
  test("should display app name", async () => {
    const component = await renderer.create(<Header className="editor_nav"></Header>);
    console.log(component.toTree());
    let componentTree = component.toTree();
    if(componentTree) {
      console.log("className: ", componentTree.props.className);
      console.log("rendered: ", componentTree.rendered);
      console.log("rendered.props: ", componentTree.rendered.props);
      console.log("rendered.props.children: ", componentTree.rendered.props.children);
      console.log("rendered.props.children.props: ", componentTree.rendered.props.children.props);
    }
    
    expect(component.toTree()).toBeTruthy;

  });
});