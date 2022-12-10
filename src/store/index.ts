import create from 'zustand'
import type { MessageType } from 'react-chat-elements';
import { nanoid } from 'nanoid';

interface IChartHistory {
    charts: MessageType[],
    addHumanMsg: (text: string) => void
    addRebotMsg: (text: string) => void
};

const messageTemplate: MessageType = {
    id: 1,
    position: 'right',
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    date: new Date(),
    focus: false,
    titleColor: '#000000',
    forwarded: false,
    notch: false,
    removeButton: false,
    replyButton: false,
    retracted: false,
    status: 'waiting',
    title: '',
};

export const useChartHistory = create<IChartHistory>((set) => ({
    charts: [],
    addHumanMsg: (text: string) => set(({ charts }) => {
        return {
            charts: [...charts, {
                ...messageTemplate,
                id: nanoid(),
                date: new Date(),
                title:'Me',
                titleColor:'#646cff',
                text,
            }]
        }
    }),
    addRebotMsg: (text: string) => set(({ charts }) => {
        return {
            charts: [...charts, {
                ...messageTemplate,
                id: nanoid(),
                date: new Date(),
                position: 'left',
                title:'OpenGPT',
                status: 'received',
                text,
            }]
        }
    }),
}))