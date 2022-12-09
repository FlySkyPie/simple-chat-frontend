import { useRef, useState } from 'react'
import { Input, MessageList, MessageType } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css'

import styles from './styles.module.scss';

const sampleMessage: MessageType = {
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
  status: 'received',
  title: '',
};

function App() {
  const [disableEnterSend, setDisableEnterSend] = useState(false);
  const inputRef = useRef<Input>(null);
  const messageListReferance = useRef();

  return (
    <div className={styles.app}>
      <div className={styles.container}>

        <MessageList
          referance={messageListReferance}
          className={styles.msgBox}
          //className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={[
            sampleMessage, sampleMessage, sampleMessage, sampleMessage,
            sampleMessage, sampleMessage, sampleMessage, sampleMessage,
            sampleMessage, sampleMessage, sampleMessage


          ]} />
        <Input
          className={styles.input}
          multiline
          //clear={(clear: any) => (inputClear = clear)}
          maxHeight={100}
          placeholder='Type here...'
          onKeyUp={(event) => {
            if (event.key === 'Shift') {
              setDisableEnterSend(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Shift') {
              setDisableEnterSend(true)
            }
            if (disableEnterSend) {
              return;
            }

            if (event.key === 'Enter') {
              const element = event.currentTarget as HTMLTextAreaElement;
              console.log(element.value)

              element.value = '';

              event.preventDefault();
            }


            console.log(event.key)
          }}
          onSubmit={() => {
            console.log('submit');
          }} />
      </div>
    </div>
  )
}

export default App
