import getSamplesByFormat from '@generative-music/samples-alex-bainter';
import makeProvider from '@generative-music/web-provider';
import sampleFormat from '@config/sample-format';

const sampleIndex = getSamplesByFormat()[sampleFormat];
const provider = makeProvider(sampleIndex);

export default provider;
