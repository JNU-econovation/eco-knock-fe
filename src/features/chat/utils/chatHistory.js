export const mapChatHistoryToMessages = (items) => (
  [...items].reverse().flatMap(({ id, question, answer }) => [
    {
      id: `history-${id}-user`,
      role: 'user',
      content: question,
    },
    {
      id: `history-${id}-assistant`,
      role: 'assistant',
      content: answer,
    },
  ])
);
