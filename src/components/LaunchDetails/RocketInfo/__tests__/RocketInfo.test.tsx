import {mount} from "enzyme";
import React from "react";
import {RocketData} from "../../../../types/rocket-data";
import RocketInfo from "../index";

const rocketDataMock: RocketData = {
  name: 'Rocket',
  type: 'type1',
  height: 123,
  diameter: 456,
  mass: 123454535
}

it('mount without crashing', () => {
  mount(<RocketInfo rocketData={rocketDataMock} />);
});
