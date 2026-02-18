// Listener for when the extension icon is clicked
chrome.action.onClicked.addListener(async (tab) => {
  // Get the URL of the current active tab
  const currentUrl = tab.url;
  let newUrl = '';
  let username = '';
  let platformPrefix = '';

  // Helper function to extract username using a regex
  const extractUsername = (url, patterns) => {
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  // Define URL patterns for each site and their corresponding platform prefixes
  const siteConfigs = [
    {
      name: 'AmateurTV',
      domains: ['amateur.tv'],
      patterns: [
        /https:\/\/(?:www\.)?amateur\.tv\/([a-zA-Z0-9_-]+)/
      ],
      prefix: 'atv'
    },
    {
      name: 'BongaCams',
      domains: ['bongacams.com'],
      patterns: [
        /https:\/\/(?:www\.)?bongacams\.com\/([a-zA-Z0-9_-]+)/i // Case-insensitive for username
      ],
      prefix: 'bc'
    },
    {
      name: 'Cam4',
      domains: ['cam4.com'],
      patterns: [
        /https:\/\/(?:www\.)?cam4\.com\/([a-zA-Z0-9_-]+)/i
      ],
      prefix: 'c4'
    },
    {
      name: 'CamSoda',
      domains: ['camsoda.com'],
      patterns: [
        /https:\/\/(?:www\.)?camsoda\.com\/([a-zA-Z0-9_-]+)/i
      ],
      prefix: 'cs'
    },
    {
      name: 'Chaturbate',
      domains: ['chaturbate.com'],
      patterns: [
        /https:\/\/(?:www\.)?chaturbate\.com\/([a-zA-Z0-9_-]+)\/?/i
      ],
      prefix: 'cb'
    },
    {
      name: 'CherryTV',
      domains: ['cherry.tv'],
      patterns: [
        /https:\/\/(?:www\.)?cherry\.tv\/([a-zA-Z0-9_-]+)/i
      ],
      prefix: 'ctv'
    },
    {
      name: 'Flirt4Free',
      domains: ['flirt4free.com'],
      patterns: [
        /https:\/\/(?:www\.)?flirt4free\.com\/\?model=([a-zA-Z0-9_-]+)/i
      ],
      prefix: 'f4f'
    },
    {
      name: 'ImLive',
      domains: ['imlive.com'],
      patterns: [
        /https:\/\/(?:www\.)?imlive\.com\/live-sex-chats\/cam-girls\/video-chats\/([a-zA-Z0-9_-]+)/i
      ],
      prefix: 'im'
    },
    {
      name: 'LiveJasmin',
      domains: ['livejasmin.com'],
      patterns: [
        /https:\/\/(?:www\.)?livejasmin\.com\/(?:en\/)?girls#!(?:chat\/)?([a-zA-Z0-9_-]+)/i
      ],
      prefix: 'lj'
    },
    {
      name: 'MyFreeCams',
      domains: ['myfreecams.com'],
      patterns: [
        /https:\/\/(?:www\.)?myfreecams\.com\/\?r=\d+#([a-zA-Z0-9_-]+)/i, // With r=0
        /https:\/\/(?:www\.)?myfreecams\.com\/([a-zA-Z0-9_-]+)/i // Direct username URL (less common but possible)
      ],
      prefix: 'mfc'
    },
    {
      name: 'ShowUpTV',
      domains: ['showup.tv'],
      patterns: [
        /https:\/\/(?:www\.)?showup\.tv\/([a-zA-Z0-9_-]+)/i
      ],
      prefix: 'stv'
    },
    {
      name: 'Streamate',
      domains: ['streamate.com'],
      patterns: [
        /https:\/\/(?:www\.)?streamate\.com\/cam\/([a-zA-Z0-9_-]+)/i
      ],
      prefix: 'sm'
    },
    {
      name: 'StreamRay',
      domains: ['streamray.com'],
      patterns: [
        /https:\/\/(?:www\.)?streamray\.com\/([a-zA-Z0-9_-]+)/i
      ],
      prefix: 'sr'
    },
    {
      name: 'StripChat',
      domains: ['stripchat.com'],
      patterns: [
        /https:\/\/(?:www\.)?stripchat\.com\/([a-zA-Z0-9_-]+)/i
      ],
      prefix: 'sc'
    },
    {
      name: 'XloveCam',
      domains: ['xlovecam.com'],
      patterns: [
        /https:\/\/(?:www\.)?xlovecam\.com\/(?:en\/)?chat\/([a-zA-Z0-9_-]+)/i
      ],
      prefix: 'xl'
    }
  ];

  // Iterate through site configurations to find a match
  for (const site of siteConfigs) {
    if (site.domains.some(domain => currentUrl.includes(domain))) {
      username = extractUsername(currentUrl, site.patterns);
      if (username) {
        platformPrefix = site.prefix;
        newUrl = `https://camgirlfinder.net/models/${platformPrefix}/${username}#1`;
        break; // Exit loop once a match is found
      }
    }
  }

  // If a new URL was successfully constructed, open it in a new tab next to the current one
  if (newUrl) {
    chrome.tabs.create({ url: newUrl, index: tab.index + 1 });
  } else {
    // Log a message if no matching model page is found
    console.log("No matching model page found for this URL or platform is not supported.");
  }
});
