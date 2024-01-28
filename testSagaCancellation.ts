import { call, delay, race } from "redux-saga/effects";
import BackendService from "../../../server/BackendService";

const loopAsyncCalls = async () => {
  console.log('starting async function!');
  for (let i = 0; i < 10; i++) {
    console.log('starting async function');
    await realAsyncCall(i);
  }
  console.log('finished all async methods');
}

const realAsyncCall = async (i) => {
  try {
    console.log('calling backend service');
    await BackendService.getFirmwareVersionsJson();
    console.log(`finished invoking ${i} async method`)
  } catch (error) {
    console.log(`error while invoking ${i} async method`)
  }
}

const notRealAsyncCall = async (i) => {
  for (let i = 0; i < 15000; i++) {
    console.log(`in loop ${i}`);
  }
  console.log(`finished invoking ${i} not real async method`)
}

function* sagaLoopAsyncCalls() {
  console.log('starting async function!');
  for (let i = 0; i < 10; i++) {
    console.log('starting async function');
    yield call(realAsyncCall, i);// or notRealAsyncCall
  }
  console.log('finished all async methods');
}

function* backgroundTask() {
  yield call(loopAsyncCalls);// or sagaLoopAsyncCalls
}

function* testSagaCancellation() {
  const startDate = new Date();

  yield race({
    task: call(backgroundTask),
    timeout: delay(1)
  });

  //or:
  // const task = yield fork(backgroundTask);
  // yield delay(1);
  // yield cancel(task);


  console.log(`Stopped after ${(new Date().getTime() - startDate.getTime()) / 100} s`)
}


 //fork(testSagaCancellation)...