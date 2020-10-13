import getSamplesByFormat from '@generative-music/samples-alex-bainter';
import createProvider from '@generative-music/web-provider';
import createLibrary from '@generative-music/web-library';
import sampleFormat from '@config/sample-format';

const provider = createProvider();
const sampleIndex = getSamplesByFormat()[sampleFormat];
const library = createLibrary({ sampleIndex, provider });

export default library;
