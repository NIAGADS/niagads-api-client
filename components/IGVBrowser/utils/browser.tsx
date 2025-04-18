import {
    Session,
    TrackBaseOptions,
    IGVTrackOptions,
} from "@/components/IGVBrowser/types/tracks";
import { decodeBedXY } from "@/components/IGVBrowser/decoders/bedDecoder";
import { resolveTrackReader } from "./tracks";

const ALWAYS_ON_TRACKS = ["ideogram", "ruler", "sequence", "ENSEMBL_GENE"];

// functions for maninpulating IGV browser object
export const loadTrack = async (config: any, browser: any) => {
    await browser.loadTrack(config);
};

export const loadTracks = (tracks: TrackBaseOptions[], browser: any) => {
    for (const track of tracks as IGVTrackOptions[]) {
        if (track.type.includes("_service")) {
            track.reader = resolveTrackReader(track.type, {
                endpoint: track.url,
                track: track.id,
            });
        }
        if ("format" in track) {
            if (track.format.match("^bed\\d{1,2}\\+\\d+$") != null) {
                // does it match bedX+Y?
                track.decode = decodeBedXY;
            }
        }
        // load
        browser.loadTrack(track);
    }
};

export const createSessionSaveObj = (tracks: TrackBaseOptions[]): Session => {
    //remove sequence
    tracks = tracks.filter((track) => !(track.type !== "sequence"));

    //remove refereence object
    tracks = tracks.filter((track) => !(track.id === "reference"));

    //remove any functions
    for (const track of tracks) {
        for (const prop in track) {
            if (typeof prop === "function") delete track[prop];
        }
    }

    //TODO: locus and roi are currently set to default values
    const sessionObj: Session = {
        tracks: tracks,
        roi: [],
        locus: "chr19:1,038,997-1,066,572",
    };

    return sessionObj;
};

export const removeNonReferenceTracks = (
    tracks: TrackBaseOptions[],
    browser: any
) => {
    for (const track of tracks) {
        if (track.id !== "REFSEQ_GENE" && track.id !== "ENSEMBL_GENE") {
            browser.removeTrackByName(track.name);
        }
    }
};
