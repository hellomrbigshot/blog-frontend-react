import { takeLatest, put, select } from 'redux-saga/effects'
import { fetch } from '../../../common'
import { GET_TAG_LIST } from './actionTypes'
import { initTagList } from './actionCreators'

export function* getTagList() {
    yield takeLatest(GET_TAG_LIST, axiosGetTagList)
}

function* axiosGetTagList() {
    try {
        const res = yield fetch.post('/api/tag/alltags')
        yield put(initTagList(res.data.data))
    } catch (e) {
        console.log(e)
    }
}


