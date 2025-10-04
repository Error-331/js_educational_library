// external imports

// internal imports

// implementation
const META_MIME_TYPE_VIDEO = 'META_MIME_TYPE_VIDEO';
const META_MIME_TYPE_AUDIO = 'META_MIME_TYPE_AUDIO';

const MIME_TYPE_3DOSTR = 'application/vnd.pg.format';
const MIME_TYPE_3G2 = {
    [META_MIME_TYPE_VIDEO]: 'video/3gpp2',
    [META_MIME_TYPE_AUDIO]: 'audio/3gpp2',
};
const MIME_TYPE_3GP = {
    [META_MIME_TYPE_VIDEO]: 'video/3gpp',
    [META_MIME_TYPE_AUDIO]: 'audio/3gpp',
};
const MIME_TYPE_4XM = 'audio/x-adpcm';
const MIME_TYPE_7Z = 'application/x-7z-compressed';
const MIME_TYPE_A64 = 'application/octet-stream ';
const MIME_TYPE_AA = 'application/octet-stream';
const MIME_TYPE_AAC = 'audio/aac';
const MIME_TYPE_ABW = 'application/x-abiword';
const MIME_TYPE_AC3 = 'audio/x-ac3';
const MIME_TYPE_ACM = 'application/octet-stream';
const MIME_TYPE_ADTS = 'audio/aac';
const MIME_TYPE_AIFF = 'audio/aiff';
const MIME_TYPE_AMR = 'audio/amr';
const MIME_TYPE_APNG = 'image/png';
const MIME_TYPE_ARC = 'application/x-freearc';
const MIME_TYPE_ASF = {
    [META_MIME_TYPE_VIDEO]: 'video/x-ms-asf',
    [META_MIME_TYPE_AUDIO]: 'audio/x-ms-wma',
};
const MIME_TYPE_ASF_STREAM = 'video/x-ms-asf';
const MIME_TYPE_ASS = 'text/x-ass';
const MIME_TYPE_AU = 'audio/basic';
const MIME_TYPE_AVI = 'video/x-msvideo';
const MIME_TYPE_AVIF = 'image/avif';
const MIME_TYPE_AVM2 = 'application/x-shockwave-flash';
const MIME_TYPE_AZW = 'application/vnd.amazon.ebook';
const MIME_TYPE_BIN = 'application/octet-stream';
const MIME_TYPE_BIT = 'audio/bit';
const MIME_TYPE_BMP = 'image/bmp';
const MIME_TYPE_BZ = 'application/x-bzip';
const MIME_TYPE_BZ2 = 'application/x-bzip2';
const MIME_TYPE_CAF = 'audio/x-caf';
const MIME_TYPE_CDA = 'application/x-cdf';
const MIME_TYPE_CSH = 'application/x-csh';
const MIME_TYPE_CSS = 'text/css';
const MIME_TYPE_CSV = 'text/csv';
const MIME_TYPE_DIVX = 'video/divx';
const MIME_TYPE_DOC = 'application/msword';
const MIME_TYPE_DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const MIME_TYPE_DTS = 'audio/x-dca';
const MIME_TYPE_DV = 'video/x-dv';
const MIME_TYPE_DVD = 'video/mpeg';
const MIME_TYPE_EAC3 = 'audio/x-eac3';
const MIME_TYPE_EOT = 'application/vnd.ms-fontobject';
const MIME_TYPE_EPUB = 'application/epub+zip';
const MIME_TYPE_F4V = 'application/f4v';
const MIME_TYPE_FLAC = 'audio/x-flac';
const MIME_TYPE_FLV = 'video/x-flv';
const MIME_TYPE_G722 = 'audio/G722';
const MIME_TYPE_G723_1 = 'audio/g723';
const MIME_TYPE_GIF = 'image/gif';
const MIME_TYPE_GSM = 'audio/x-gsm';
const MIME_TYPE_GZ = 'application/gzip';
const MIME_TYPE_H261 = 'video/x-h261';
const MIME_TYPE_H263 = 'video/x-h263';
const MIME_TYPE_HLS = 'application/x-mpegURL';
const MIME_TYPE_HTML = 'text/html';
const MIME_TYPE_APPLE_HTTP = 'application/x-mpegURL';
const MIME_TYPE_ICO = 'image/vnd.microsoft.icon';
const MIME_TYPE_ICS = 'text/calendar';
const MIME_TYPE_ILBC = 'audio/iLBC';
const MIME_TYPE_IPOD = 'video/mp4';
const MIME_TYPE_ISMV = 'video/mp4';
const MIME_TYPE_JACOSUB = 'text/x-jacosub';
const MIME_TYPE_JAR = 'application/java-archive';
const MIME_TYPE_JPG = 'image/jpg'; // "unofficial" MIME type - should not be used
const MIME_TYPE_JPEG = 'image/jpeg';
const MIME_TYPE_JPEG_PIPE = 'image/jpeg';
const MIME_TYPE_JPEGLS_PIPE = 'image/jpeg';
const MIME_TYPE_JS = 'text/javascript';
const MIME_TYPE_JSON = 'application/json';
const MIME_TYPE_JSONLD = 'application/ld+json';
const MIME_TYPE_LATM = 'audio/MP4A-LATM';
const MIME_TYPE_LIVE_FLV = 'video/x-flv';
const MIME_TYPE_M2TS = 'video/MP2T';
const MIME_TYPE_M4V = 'video/x-m4v';
const MIME_TYPE_MATROSKA = 'video/x-matroska';
const MIME_TYPE_MD = 'text/markdown';
const MIME_TYPE_MICRODVD = 'text/x-microdvd';
const MIME_TYPE_MID = 'audio/midi';
const MIME_TYPE_MIDI = 'audio/x-midi';
const MIME_TYPE_MJPEG = 'video/x-mjpeg';
const MIME_TYPE_MJPEG_2000 = 'video/x-mjpeg';
const MIME_TYPE_MJS = 'text/javascript';
const MIME_TYPE_MMF = 'application/vnd.smaf';
const MIME_TYPE_MOV = 'video/mp4';
const MIME_TYPE_M4A = 'video/mp4';
const MIME_TYPE_MJ2 = 'video/mp4';
const MIME_TYPE_MOD = ['audio/mod', 'audio/x-mod'];
const MIME_TYPE_MP2 = 'audio/mpeg';
const MIME_TYPE_MP3 = 'audio/mpeg';
const MIME_TYPE_MP4 = 'video/mp4';
const MIME_TYPE_MPEG = 'video/mpeg';
const MIME_TYPE_MPEG1VIDEO = 'video/mpeg';
const MIME_TYPE_MPEG2VIDEO = 'video/mpeg';
const MIME_TYPE_MPEGTS = 'video/MP2T';
const MIME_TYPE_MPEGTSRAW = 'video/MP2T';
const MIME_TYPE_MPEGVIDEO = 'video/mpeg';
const MIME_TYPE_MPJPEG = 'multipart/x-mixed-replace;';
const MIME_TYPE_MPKG = 'application/vnd.apple.installer+xml';
const MIME_TYPE_MXF = 'application/mxf';
const MIME_TYPE_MXF_D10 = 'application/mxf';
const MIME_TYPE_MXF_OPATOM = 'application/mxf';
const MIME_TYPE_NSV = ['video/x-nsv', 'application/x-winamp'];
const MIME_TYPE_NUT = 'video/x-nut';
const MIME_TYPE_ODP = 'application/vnd.oasis.opendocument.presentation';
const MIME_TYPE_ODS = 'application/vnd.oasis.opendocument.spreadsheet';
const MIME_TYPE_ODT = 'application/vnd.oasis.opendocument.text';
const MIME_TYPE_OGA = 'audio/ogg';
const MIME_TYPE_OGG = 'application/ogg';
const MIME_TYPE_OGV = 'video/ogg';
const MIME_TYPE_OGX = 'application/ogg';
const MIME_TYPE_OMA = 'audio/x-oma';
const MIME_TYPE_OPUS = 'audio/ogg';
const MIME_TYPE_OTF = 'font/otf';
const MIME_TYPE_PNG = 'image/png';
const MIME_TYPE_PPT = 'application/vnd.ms-powerpoint';
const MIME_TYPE_PPTX = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
const MIME_TYPE_QUICKTIME = 'video/quicktime';
const MIME_TYPE_RAR = 'application/vnd.rar';
const MIME_TYPE_RM = 'application/vnd.rn-realmedia';
const MIME_TYPE_RTF = 'application/rtf';
const MIME_TYPE_SH = 'application/x-sh';
const MIME_TYPE_SINGLEJPEG = 'image/jpeg';
const MIME_TYPE_SMJPEG = 'image/jpeg';
const MIME_TYPE_SPX = 'audio/ogg';
const MIME_TYPE_SRT = 'application/x-subrip';
const MIME_TYPE_SUP = 'application/x-pgs';
const MIME_TYPE_SVCD = 'video/mpeg';
const MIME_TYPE_SVG = 'image/svg+xml';
const MIME_TYPE_SWF = 'application/x-shockwave-flash';
const MIME_TYPE_TAR = 'application/x-tar';
const MIME_TYPE_TIFF = 'image/tiff';
const MIME_TYPE_TS = 'video/mp2t';
const MIME_TYPE_TTA = 'audio/x-tta';
const MIME_TYPE_TTF = 'font/ttf';
const MIME_TYPE_TXT = 'text/plain';
const MIME_TYPE_VCD = 'video/mpeg';
const MIME_TYPE_VOB = 'video/mpeg';
const MIME_TYPE_VOC = 'audio/x-voc';
const MIME_TYPE_VSD = 'application/vnd.visio';
const MIME_TYPE_WAV = 'audio/x-wav';
const MIME_TYPE_WEBA = 'audio/webm';
const MIME_TYPE_WEBM = 'video/webm';
const MIME_TYPE_WEBM_CHUNK = 'video/webm';
const MIME_TYPE_WEBM_DASH_MANIFEST = 'application/xml';
const MIME_TYPE_WEBMANIFEST = 'application/manifest+json';
const MIME_TYPE_WEBP = 'image/webp';
const MIME_TYPE_WEBVTT = 'text/vtt';
const MIME_TYPE_WOFF = 'font/woff';
const MIME_TYPE_WOFF2 = 'font/woff2';
const MIME_TYPE_WV = 'audio/x-wavpack';
const MIME_TYPE_XHTML = 'application/xhtml+xml';
const MIME_TYPE_XLS = 'application/vnd.ms-excel';
const MIME_TYPE_XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const MIME_TYPE_XML = 'application/xml';
const MIME_TYPE_XUL = 'application/vnd.mozilla.xul+xml';
const MIME_TYPE_ZIP = 'application/zip';

// exports
export {
    META_MIME_TYPE_VIDEO,
    META_MIME_TYPE_AUDIO,

    MIME_TYPE_3DOSTR,
    MIME_TYPE_3G2,
    MIME_TYPE_3GP,
    MIME_TYPE_4XM,
    MIME_TYPE_7Z,
    MIME_TYPE_A64,
    MIME_TYPE_AA,
    MIME_TYPE_AAC,
    MIME_TYPE_ABW,
    MIME_TYPE_AC3,
    MIME_TYPE_ACM,
    MIME_TYPE_ADTS,
    MIME_TYPE_AIFF,
    MIME_TYPE_AMR,
    MIME_TYPE_APNG,
    MIME_TYPE_ARC,
    MIME_TYPE_ASF,
    MIME_TYPE_ASF_STREAM,
    MIME_TYPE_ASS,
    MIME_TYPE_AU,
    MIME_TYPE_AVI,
    MIME_TYPE_AVIF,
    MIME_TYPE_AVM2,
    MIME_TYPE_AZW,
    MIME_TYPE_BIN,
    MIME_TYPE_BIT,
    MIME_TYPE_BMP,
    MIME_TYPE_BZ,
    MIME_TYPE_BZ2,
    MIME_TYPE_CAF,
    MIME_TYPE_CDA,
    MIME_TYPE_CSH,
    MIME_TYPE_CSS,
    MIME_TYPE_CSV,
    MIME_TYPE_DIVX,
    MIME_TYPE_DOC,
    MIME_TYPE_DOCX,
    MIME_TYPE_DTS,
    MIME_TYPE_DV,
    MIME_TYPE_DVD,
    MIME_TYPE_EAC3,
    MIME_TYPE_EOT,
    MIME_TYPE_EPUB,
    MIME_TYPE_F4V,
    MIME_TYPE_FLAC,
    MIME_TYPE_FLV,
    MIME_TYPE_G722,
    MIME_TYPE_G723_1,
    MIME_TYPE_GIF,
    MIME_TYPE_GSM,
    MIME_TYPE_GZ,
    MIME_TYPE_H261,
    MIME_TYPE_H263,
    MIME_TYPE_HLS,
    MIME_TYPE_HTML,
    MIME_TYPE_APPLE_HTTP,
    MIME_TYPE_ICO,
    MIME_TYPE_ICS,
    MIME_TYPE_ILBC,
    MIME_TYPE_IPOD,
    MIME_TYPE_ISMV,
    MIME_TYPE_JACOSUB,
    MIME_TYPE_JAR,
    MIME_TYPE_JPG,
    MIME_TYPE_JPEG,
    MIME_TYPE_JPEG_PIPE,
    MIME_TYPE_JPEGLS_PIPE,
    MIME_TYPE_JS,
    MIME_TYPE_JSON,
    MIME_TYPE_JSONLD,
    MIME_TYPE_LATM,
    MIME_TYPE_LIVE_FLV,
    MIME_TYPE_M2TS,
    MIME_TYPE_M4V,
    MIME_TYPE_MATROSKA,
    MIME_TYPE_MD,
    MIME_TYPE_MICRODVD,
    MIME_TYPE_MID,
    MIME_TYPE_MIDI,
    MIME_TYPE_MJPEG,
    MIME_TYPE_MJPEG_2000,
    MIME_TYPE_MJS,
    MIME_TYPE_MMF,
    MIME_TYPE_MOV,
    MIME_TYPE_M4A,
    MIME_TYPE_MJ2,
    MIME_TYPE_MOD,
    MIME_TYPE_MP2,
    MIME_TYPE_MP3,
    MIME_TYPE_MP4,
    MIME_TYPE_MPEG,
    MIME_TYPE_MPEG1VIDEO,
    MIME_TYPE_MPEG2VIDEO,
    MIME_TYPE_MPEGTS,
    MIME_TYPE_MPEGTSRAW,
    MIME_TYPE_MPEGVIDEO,
    MIME_TYPE_MPJPEG,
    MIME_TYPE_MPKG,
    MIME_TYPE_MXF,
    MIME_TYPE_MXF_D10,
    MIME_TYPE_MXF_OPATOM,
    MIME_TYPE_NSV,
    MIME_TYPE_NUT,
    MIME_TYPE_ODP,
    MIME_TYPE_ODS,
    MIME_TYPE_ODT,
    MIME_TYPE_OGA,
    MIME_TYPE_OGG,
    MIME_TYPE_OGV,
    MIME_TYPE_OGX,
    MIME_TYPE_OMA,
    MIME_TYPE_OPUS,
    MIME_TYPE_OTF,
    MIME_TYPE_PNG,
    MIME_TYPE_PPT,
    MIME_TYPE_PPTX,
    MIME_TYPE_QUICKTIME,
    MIME_TYPE_RAR,
    MIME_TYPE_RM,
    MIME_TYPE_RTF,
    MIME_TYPE_SH,
    MIME_TYPE_SINGLEJPEG,
    MIME_TYPE_SMJPEG,
    MIME_TYPE_SPX,
    MIME_TYPE_SRT,
    MIME_TYPE_SUP,
    MIME_TYPE_SVCD,
    MIME_TYPE_SVG,
    MIME_TYPE_SWF,
    MIME_TYPE_TAR,
    MIME_TYPE_TIFF,
    MIME_TYPE_TS,
    MIME_TYPE_TTA,
    MIME_TYPE_TTF,
    MIME_TYPE_TXT,
    MIME_TYPE_VCD,
    MIME_TYPE_VOB,
    MIME_TYPE_VOC,
    MIME_TYPE_VSD,
    MIME_TYPE_WAV,
    MIME_TYPE_WEBA,
    MIME_TYPE_WEBM,
    MIME_TYPE_WEBM_CHUNK,
    MIME_TYPE_WEBM_DASH_MANIFEST,
    MIME_TYPE_WEBMANIFEST,
    MIME_TYPE_WEBP,
    MIME_TYPE_WEBVTT,
    MIME_TYPE_WOFF,
    MIME_TYPE_WOFF2,
    MIME_TYPE_WV,
    MIME_TYPE_XHTML,
    MIME_TYPE_XLS,
    MIME_TYPE_XLSX,
    MIME_TYPE_XML,
    MIME_TYPE_XUL,
    MIME_TYPE_ZIP,
};
