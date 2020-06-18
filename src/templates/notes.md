## Difference from original sample

## Attachment

Given

```txt
  "attachedFile": {
    "uRI": "https://wfa.org.au/filestore/",
    "encodingCode": "base64",
    "mIMECode": "application/pdf",
    "size": "12600"
  },
```

Changed

```txt
  attachments: [{
    filename: "sample.pdf",
    type: "application/pdf",
    data: "FAKE_BASE64_DATA_OF_PDF",
  }],
```

### Make the entire section from 1-12 an array

Missing association from transportPackages to the line items.

_Moved transportPackages into individual tradeLineItems_

## Suggested Changes

### TradeLineItem > attachedBinaryFile

Current

```txt
    attachedBinaryFile: {
        uRI: "https://docs.tweglobal.com/8c624a35-9497-41fb-a548-cb5cf43bac21.pdf"
    }
```

Suggest to change to reference document since it is not "attached"

### Change "information" to "description"

### Break down grossWeight & grossVolume

value & units

## Missing

Port of discharge information
