import React from 'react';

import MenuItemReviewTable from "main/components/MenuItemReview/MenuItemReviewTable";
import { menuItemReviewFixtures } from 'fixtures/menuItemReviewFixtures';

export default {
    title: 'components/MenuItemReview/MenuItemReviewTable',
    component: MenuItemReviewTable
};

const Template = (args) => {
    return (
        <MenuItemReviewTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    menuitemreview: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    menuitemreview: menuItemReviewFixtures.threeMenuItemReviews
};


