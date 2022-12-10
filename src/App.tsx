import { useRef, useState } from 'react'
import { Input, MessageList, } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css'

import { useTextCompletion } from './openai';
import { useChartHistory } from './store';
import styles from './styles.module.scss';

function App() {
  const { charts, addHumanMsg, addRebotMsg } = useChartHistory();
  const { request } = useTextCompletion();
  const [disableEnterSend, setDisableEnterSend] = useState(false);
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
          dataSource={charts} />
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

              if (element.value === '') {
                return;
              }

              addHumanMsg(element.value);
              request(element.value).then(result => {
                addRebotMsg(result);
              })
              //addRebotMsg('This is echo: ' + element.value)
              element.value = '';

              event.preventDefault();
            }
          }}
          onSubmit={() => {
            console.log('submit');
          }} />
      </div>
    </div>
  )
}

export default App
