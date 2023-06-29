import { ComponentMeta,ComponentStory } from "@storybook/react";
import Text from "./index"

export default {
    title:"Atoms/Text",
    argTypes:{
        variant:{
            options:[
                "extraSmall",
                "small",
                "medium",
                "mediumLarge",
                "large",
                "extraLarge"
            ],
            control:{type:"select"},
            defaultValue:"medium",
            // docsに表示する内容を設定
            description:"テキストバリアント",
            table:{
                type:{summary:"extraSmall,small,medium,mediumLarge,large,extraLarge"},
                defaultValue:{summary:"medium"}
            }
        },
        children:{
            control:{type:"text"},
            description:"フォントの太さ",
            table:{
                type:{summary:"string"}
            },
        },
        backgroundColor:{
            control:{type:"color"},
            description:"背景色",
            table:{type:{summary:"string"}}
        },
        m:{
            control:{type:"number"},
            description:"マージン",
            table:{type:{summary:"number"}}
        },
        mt:{
            control:{type:"number"},
            description:"マージントップ",
            table:{type:{summary:"number"}}
        },
        mr: {
            control: { type: 'number' },
            description: 'マージンライト',
            table: {type: { summary: 'number' },},
        },
        mb: {
            control: { type: 'number' },
            description: 'マージンボトム',
            table: {
            type: { summary: 'number' },},
        },
        ml: {
            control: { type: 'number' },
            description: 'マージンレフト',
            table: {
            type: { summary: 'number' },},
        },
        p: {
            control: { type: 'number' },
            description: 'パディング',
            table: {type: { summary: 'number' },},
        },
        pt: {
            control: { type: 'number' },
            description: 'パディングトップ',
            table: {type: { summary: 'number' },},
        },
        pr: {
            control: { type: 'number' },
            description: 'パディングライト',
            table: {type: { summary: 'number' },},
        },
        pb: {
            control: { type: 'number' },
            description: 'パディングボトム',
            table: {type: { summary: 'number' },},
        },
        pl: {
            control: { type: 'number' },
            description: 'パディングレフト',
            table: {type: { summary: 'number' },},
        },
    }
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

const longText = `Hello World`;

export const ExtraSmall = Template.bind({})
ExtraSmall.args = {
    variant:"extraSmall",
    children:longText,
}
