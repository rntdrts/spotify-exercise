import { watchLoginUser, watchSignupUser } from './auth';
import { watchGetMusics } from './spotify';

export default function* rootSaga () {
    yield [
        watchLoginUser(),
        watchSignupUser(),
        watchGetMusics()
    ];
}