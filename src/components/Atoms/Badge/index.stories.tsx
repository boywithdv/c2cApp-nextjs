import { ComponentMeta, ComponentStory } from '@storybook/react'
import Badge from './index'

export default {
  title: 'Atoms/Badge',
  argTypes: {
    content: {
      control: { type: 'text' },
      description: 'バッジのテキスト',
      table: {
        type: { summary: 'string' },
      },
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'バッジの色',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />

export const DarkBlue = Template.bind({})
DarkBlue.args = { content: '1', backgroundColor: '#464ff9' }

export const Perple = Template.bind({})
Perple.args = { content: '2', backgroundColor: '#bd6cff' }

export const Red = Template.bind({})
Red.args = { content: '10', backgroundColor: '#d4001a' }
