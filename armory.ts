import fetch from "node-fetch";

const getArmory = async (userName: string) => {
  const response = await fetch("https://twitch.tv/");
  const body = await response.text();

  let clientId;
  clientId = body.split("clientId=").pop();
  clientId = clientId?.split('"', 2).join('"');
  clientId = clientId?.replace('"', "");

  let userId: string = "";

  const query = `
    {
        user(login: "${userName}") {
          id
        }
    }
    `;

  console.log(`[INFO] GETTING ID FOR ${userName}`);

  const getId = await fetch("https://gql.twitch.tv/gql#origin=twilight", {
    method: "POST",
    body: JSON.stringify({ query: `${query}` }),
    headers: { "Client-Id": `${clientId}`, "Content-Type": "application/json" },
  });
  const Id = await getId.json();

  if (Id.data.user != null) {
    userId = Id.data.user.id;
    console.log(`[INFO] ID FOR ${userName} OBTAINED: ${userId}`);

    let extBody = [
      {
        operationName: "ExtensionsForChannel",
        variables: {
          channelID: `${userId}`,
        },
        extensions: {
          persistedQuery: {
            version: 1,
            sha256Hash:
              "d52085e5b03d1fc3534aa49de8f5128b2ee0f4e700f79bf3875dcb1c90947ac3",
          },
        },
      },
    ];

    const getExtensions = await fetch(
      "https://gql.twitch.tv/gql#origin=twilight",
      {
        method: "POST",
        body: JSON.stringify(extBody),
        headers: { "Client-Id": `${clientId}` },
      }
    );

    const extensions = await getExtensions.json();

    let jwt: string = "";
    let region: string = "";

    for (
      let i = 0;
      i < extensions[0].data.user.channel.selfInstalledExtensions.length;
      i++
    ) {
      let ext = extensions[0].data.user.channel.selfInstalledExtensions[i];
      if (ext.installation.extension.name == "Lost Ark Armory") {
        jwt = ext.token.jwt;
        region = JSON.parse(ext.configuration.broadcaster.content).region;
      }
    }

    let armory = "";
    if (jwt && region) {
      const getArmory = await fetch(
        `https://cache.lostark.games.aws.dev/${region}/profile/${userId}?language=en-US`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      armory = await getArmory.json();

      if (await getArmory.ok) {
        console.log(
          "[INFO] Extension exists and player is online, obtaining the armory!"
        );
      } else {
        console.log(
          "[INFO] Extension exists, but player is offline, couldn't obtain the armory"
        );
      }
    } else {
      armory = "This user doesn't have Armory Extension";
      console.log("[WARN] This user doesn't have Armory Extension.");
    }
    return armory;
  } else {
    return "This user doesn't exist";
  }
};

export { getArmory };
