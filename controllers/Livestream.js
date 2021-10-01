import Mux from "@mux/mux-node";
const { Video } = new Mux(
  process.env.MUX_TOKEN_ID,
  process.env.MUX_TOKEN_SECRET
);

const createLiveStream = () => {
  await Video.LiveStreams.create({
    playback_policy: "public",
    new_asset_settings: { playback_policy: "public" },
  });
}

module.exports = { createLiveStream };
