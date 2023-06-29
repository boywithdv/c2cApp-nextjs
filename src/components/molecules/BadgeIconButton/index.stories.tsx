import { ComponentMeta, ComponentStory } from '@storybook/react'
import BadgeIconButton from './index'
import {
  PersonIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '../../Atoms/IconButton'

export default {
  title: 'Molecules/BadgeIconButton',
  argTypes: {
    icon: {
      control: { type: 'object' },
      description: 'アイコン',
      table: {
        type: { summary: 'object' },
      },
    },
    badgeContent: {
      control: { type: 'number' },
      description: 'バッジのカウンター',
      table: {
        type: { summary: 'number' },
      },
    },
    badgeBackgroundColor: {
      control: { type: 'color' },
      description: 'バッジの背景色',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as ComponentMeta<typeof BadgeIconButton>

const Template: ComponentStory<typeof BadgeIconButton> = (args) => (
  <BadgeIconButton {...args} />
)

export const SearchBadgeIcon = Template.bind({})
SearchBadgeIcon.args = {
  icon: <SearchIcon size={24} />,
  badgeContent: 1,
  badgeBackgroundColor: "#464ff9",
};

export const PersonBadgeIcon = Template.bind({})
PersonBadgeIcon.args = {
  icon: <PersonIcon size={24} />,
  badgeContent: 1,
  badgeBackgroundColor: "#bd6cff",
};

export const ShoppingCartBadgeIcon = Template.bind({})
ShoppingCartBadgeIcon.args = {
  icon: <ShoppingCartIcon size={24} />,
  badgeContent: 1,
  badgeBackgroundColor: "#d4001a",
};
