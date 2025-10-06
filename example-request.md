# Exercise Creation with GIFs - Example

## API Endpoint

`POST /exercises`

## Content Type

`multipart/form-data`

## Request Body

### Form Data Fields:

- `exerciseData` (JSON string): Exercise information
- `gifs` (files): Up to 4 GIF files

### Example Exercise Data:

```json
{
  "type": "exercise",
  "measurementType": "reps",
  "reps": 10,
  "isEachSide": false,
  "translations": [
    {
      "locale": "en-US",
      "name": "Push Up",
      "desc": "A basic push up exercise",
      "steps": [
        {
          "value": "Start in plank position",
          "_id": "step1"
        },
        {
          "value": "Lower your body until chest nearly touches floor",
          "_id": "step2"
        },
        {
          "value": "Push back up to starting position",
          "_id": "step3"
        }
      ]
    }
  ],
  "equipments": [
    {
      "label": "None",
      "value": "none",
      "_id": "eq1"
    }
  ],
  "targetBodyParts": [
    {
      "label": "Chest",
      "value": "chest",
      "_id": "bp1"
    },
    {
      "label": "Arms",
      "value": "arms",
      "_id": "bp2"
    }
  ]
}
```

### GIF Files:

Upload 4 GIF files with names like:

- `pushup_180.gif` (180px)
- `pushup_360.gif` (360px)
- `pushup_720.gif` (720px)
- `pushup_1080.gif` (1080px)

## Response

The API will return the created exercise with static URLs for the GIFs:

```json
{
  "id": "generated-id",
  "exerciseId": "pushup-001",
  "gifs": [
    {
      "size": 180,
      "url": "/static/exercises/gifs/pushup-001/pushup_180.gif"
    },
    {
      "size": 360,
      "url": "/static/exercises/gifs/pushup-001/pushup_360.gif"
    },
    {
      "size": 720,
      "url": "/static/exercises/gifs/pushup-001/pushup_720.gif"
    },
    {
      "size": 1080,
      "url": "/static/exercises/gifs/pushup-001/pushup_1080.gif"
    }
  ]
  // ... other exercise data
}
```

## cURL Example

```bash
curl -X POST http://localhost:3003/exercises \
  -F 'exerciseData={"type":"exercise","measurementType":"reps","reps":10,"isEachSide":false,"translations":[{"locale":"en-US","name":"Push Up","desc":"A basic push up exercise","steps":[{"value":"Start in plank position","_id":"step1"},{"value":"Lower your body until chest nearly touches floor","_id":"step2"},{"value":"Push back up to starting position","_id":"step3"}]}],"equipments":[{"label":"None","value":"none","_id":"eq1"}],"targetBodyParts":[{"label":"Chest","value":"chest","_id":"bp1"},{"label":"Arms","value":"arms","_id":"bp2"}]}' \
  -F 'files=@pushup_180.gif' \
  -F 'files=@pushup_360.gif' \
  -F 'files=@pushup_720.gif' \
  -F 'files=@pushup_1080.gif'
```
