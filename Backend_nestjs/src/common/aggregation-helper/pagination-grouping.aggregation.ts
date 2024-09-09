export async function paginationAndGroupingAndExecQuery(
  aggregateQuery,
  limit: number,
  offset: number,
  schemaModel
) {
  // Handling pagination
  aggregateQuery.push({
    $unwind: {
      path: "$result",
      preserveNullAndEmptyArrays: true,
    },
  });

  if (limit || offset) {
    aggregateQuery.push({
      $skip: offset,
    });

    aggregateQuery.push({
      $limit: limit,
    });
  }

  // Final grouping to get filtered count and result
  aggregateQuery.push({
    $group: {
      _id: null,
      recordsTotal: { $first: "$count" },
      recordsFiltered: { $sum: 1 },
      result: { $push: "$result" },
    },
  });

  // Project final result structure
  aggregateQuery.push({
    $project: {
      _id: 0,
      recordsTotal: 1,
      recordsFiltered: 1,
      result: 1,
    },
  });

  // Execute aggregation
  let finalRes = await schemaModel
    .aggregate(aggregateQuery)
    .collation({ locale: "en", strength: 1 });

  // Handle empty result case
  if (finalRes && !finalRes[0]) {
    finalRes = [
      {
        recordsTotal: 0,
        recordsFiltered: 0,
        result: [],
      },
    ];
  }
  return finalRes[0];
}

export async function tableLookup(
  aggregateQuery,
  tableName: string,
  localField: string,
  foreignField: string,
  topicName: string,
  isUnwind: boolean
) {
  aggregateQuery.push({
    $lookup: {
      from: tableName,
      localField: localField,
      foreignField: foreignField,
      as: topicName,
    },
  });

  // Unwind topic details
  if (isUnwind) {
    aggregateQuery.push({
      $unwind: {
        path: `$${topicName}`,
        preserveNullAndEmptyArrays: true,
      },
    });
  }
}
