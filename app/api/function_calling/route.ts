import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  const res = await request.json()
  const inputText = res.inputText

  const game_parser = {
    name: 'game_parser',
    description: 'Get information from an NFL game',
    parameters: {
      type: 'object',
      properties: {
        home_team: {
          type: 'string',
          description: 'What is the city and mascot of the home team?',
        },
        visiting_team: {
          type: 'string',
          description: 'What is the city and mascot of the visiting team?',
        },
        final_score: { type: 'string', description: 'Final score of the game' },
        winning_team: { type: 'string', description: 'Team that won the game' },
        game_mvp: {
          type: 'string',
          description: 'Who was the most valuable player?',
        },
        // home_team_qb: {
        //   type: 'object',
        //   properties: {
        //     name: {
        //       type: 'string',
        //       description: 'Name of the home team quarterback',
        //     },
        //     passing_yards: {
        //       type: 'number',
        //       description:
        //         'How many passing yards did the home team quarterback have?',
        //     },
        //     passing_touchdowns: {
        //       type: 'number',
        //       description:
        //         'How many passing touchdowns did the home team quarterback have?',
        //     },
        //     interceptions: {
        //       type: 'number',
        //       description:
        //         'How many interceptions did the home team quarterback have?',
        //     },
        //     attempts: {
        //       type: 'number',
        //       description:
        //         'How many passing attempts did the home team quarterback have?',
        //     },
        //     completions: {
        //       type: 'number',
        //       description:
        //         'How many passing completions did the home team quarterback have?',
        //     },
        //     rushing_yards: {
        //       type: 'number',
        //       description:
        //         'How many rushing yards did the home team quarterback have?',
        //     },
        //     rushing_touchdowns: {
        //       type: 'number',
        //       description:
        //         'How many rushing touchdowns did the home team quarterback have?',
        //     },
        //   },
        // },
        // visiting_team_qb: {
        //   type: 'object',
        //   properties: {
        //     name: {
        //       type: 'string',
        //       description: 'Name of the visiting team quarterback',
        //     },
        //     passing_yards: {
        //       type: 'number',
        //       description:
        //         'How many passing yards did the visiting team quarterback have?',
        //     },
        //     passing_touchdowns: {
        //       type: 'number',
        //       description:
        //         'How many passing touchdowns did the visiting team quarterback have?',
        //     },
        //     interceptions: {
        //       type: 'number',
        //       description:
        //         'How many interceptions did the visiting team quarterback have?',
        //     },
        //     attempts: {
        //       type: 'number',
        //       description:
        //         'How many passing attempts did the visiting team quarterback have?',
        //     },
        //     completions: {
        //       type: 'number',
        //       description:
        //         'How many passing completions did the visiting team quarterback have?',
        //     },
        //     rushing_yards: {
        //       type: 'number',
        //       description:
        //         'How many rushing yards did the visiting team quarterback have?',
        //     },
        //     rushing_touchdowns: {
        //       type: 'number',
        //       description:
        //         'How many rushing touchdowns did the visiting team quarterback have?',
        //     },
        //   },
        // },
        // key_players: {
        //   type: 'string',
        //   description:
        //     'Which players had the biggest impact on the game? Format like this: "Player 1:Team Name, Player 2:Team Name, Player 3: Team Name"',
        // },
        // injured_players: {
        //   type: 'string',
        //   description: 'Who got injured in this game?',
        // },
        // home_team_turnovers: {
        //   type: 'number',
        //   description: 'How many turnovers did the home team have?',
        // },
        // visiting_team_turnovers: {
        //   type: 'number',
        //   description: 'How many turnovers did the visiting team have?',
        // },
        // most_passing_yards: {
        //   type: 'string',
        //   description:
        //     'What player in the game had the most passing yards? Format like this. John Doe - New York Yankees: 300 yards',
        // },
        // most_rushing_yards: {
        //   type: 'string',
        //   description:
        //     'What player in the game had the most rushing yards? Format like this. John Doe - New York Yankees: 300 yards',
        // },
        // most_receiving_yards: {
        //   type: 'string',
        //   description:
        //     'What player in the game had the most receiving yards? Format like this. John Doe - New York Yankees: 300 yards',
        // },
        // most_touchdowns: {
        //   type: 'string',
        //   description:
        //     'What player in the game had the most touchdowns? Format like this. John Doe - New York Yankees: 2 touchdowns',
        // },
        // summary: {
        //   type: 'string',
        //   description: 'Give me a one sentence summary about the game.',
        // },
        // close_game: {
        //   type: 'boolean',
        //   description: 'Was this a close game?',
        // },
      },
      required: ['game_parser'],
    },
  }

  try {
    const apiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      messages: [{ role: 'user', content: inputText }],
      functions: [game_parser],
    })

    // Process apiResponse as needed here
    // ...

    return new Response(
      JSON.stringify({ inputText: inputText, apiResponse: apiResponse }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'An error occurred.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
