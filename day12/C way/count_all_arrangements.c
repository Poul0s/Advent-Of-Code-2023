/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   count_all_arrangements.c                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: psalame <psalame@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/12 19:24:45 by psalame           #+#    #+#             */
/*   Updated: 2023/12/13 16:35:24 by psalame          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"
#include <stdbool.h>

// static bool is_possibility(char *springs, int springsLen, t_condition condition, int index)
// {
// 	int checkingDataIndex = 0;
// 	int checkingDataCurrentNb = 0;
// 	int i = 0;

// 	while (i < springsLen && i < index + 1)
// 	{
// 		if (springs[i] == '#')
// 		{
// 			if (checkingDataIndex >= condition.size)
// 				return (false);
// 			checkingDataCurrentNb++;
// 			if (checkingDataCurrentNb > condition.tab[checkingDataIndex])
// 				return (false);
// 		}
// 		else
// 		{
// 			if (checkingDataCurrentNb != 0)
// 			{
// 				if (checkingDataCurrentNb < condition.tab[checkingDataIndex])
// 					return (false);
// 				checkingDataIndex++;
// 				checkingDataCurrentNb = 0;
// 			}
// 		}
// 		i++;
// 	}
// 	if (index == springsLen - 1)
// 	{
// 		if (checkingDataIndex == condition.size - 1 && checkingDataCurrentNb == condition.tab[checkingDataIndex])
// 			return (true);
// 		else if (checkingDataIndex == condition.size && checkingDataCurrentNb == 0)
// 			return (true);
// 		return (false);
// 	}
// 	else
// 		return (true);

// }

// unsigned long long count_all_arrangements(char *springs, int springsLen, t_condition condition, int index)
// {
// 	if (springs[index] == '?')
// 	{
// 		unsigned long long res = 0;
// 		int	i;
// 		for (i = 0; i < 2; i++)
// 		{
// 			springs[index] = (i == 0 ? '#' : '.');
// 			if (is_possibility(springs, springsLen, condition, index))
// 			{
// 				if (index == springsLen - 1)
// 					res++;
// 				else
// 					res += count_all_arrangements(springs, springsLen, condition, index + 1);
// 			}
// 		}
// 		springs[index] = '?';
// 		return (res);
// 	}
// 	else
// 	{
// 		if (index == springsLen - 1)
// 		{
// 			if (is_possibility(springs, springsLen, condition, index))
// 				return (1);
// 			else
// 				return (0);
// 		}
// 		else
// 			return count_all_arrangements(springs, springsLen, condition, index + 1);
// 	}
// }

// unsigned long long count_all_arrangements(char *springs, int springsLen, t_condition condition, int index, int conditionIndex, int conditionCount)
// {
// 	if (springs[index] == '?')
// 	{
// 		unsigned long long res = 0;
// 		if (conditionCount < condition.tab[conditionIndex])
// 		{
// 			if (conditionIndex == condition.size - 1 && conditionCount + 1 == condition.tab[conditionIndex])
// 				res = 1;
// 			else if (index == springsLen - 1)
// 				res = 0;
// 			else
// 			{
// 				if (conditionCount == 0)
// 				{
// 					springs[index] = '.';
// 					res += count_all_arrangements(springs, springsLen, condition, index + 1, conditionIndex, 0);
// 				}
// 				springs[index] = '#';
// 				res += count_all_arrangements(springs, springsLen, condition, index + 1, conditionIndex, conditionCount + 1);
// 			}
// 		}
// 		else
// 		{
// 			springs[index] = '.';
// 			res = count_all_arrangements(springs, springsLen, condition, index + 1, conditionIndex + 1, 0);
// 		}
// 		springs[index] = '?';
// 		return (res);
// 	}
// 	else
// 	{
// 		if (springs[index] == '#')
// 		{
// 			conditionCount++;
// 			if (conditionCount > condition.tab[conditionIndex])
// 				return (0);
// 			else if (conditionIndex == condition.size - 1 && conditionCount == condition.tab[conditionIndex])
// 				return (1);
// 			else
// 				return count_all_arrangements(springs, springsLen, condition, index + 1, conditionIndex + 1, conditionCount);
// 		}
// 		else
// 		{
// 			if (conditionCount < condition.tab[conditionIndex])
// 				return (0);
// 			else
// 				return count_all_arrangements(springs, springsLen, condition, index + 1, conditionIndex + 1, 0);
// 		}
// 	}
// }

unsigned long long count_all_arrangements(char *springs, int springsLen, t_condition condition, int index, int conditionIndex, int conditionCount)
{
	unsigned long long res = 0;
	if (springs[index] == '?')
	{
		// if (condition.tab[conditionIndex] == conditionCount)
		// {
		// 	if (conditionIndex == condition.size - 1)
		// 		return (0);
		// 	springs[index] = '.';
		// 	res = count_all_arrangements(springs, springsLen, condition, index, conditionIndex + 1, conditionCount);
		// 	springs[index] = '?';
		// 	return (res);
		// }
		// else
		// {
		// 	if (conditionCount == 0)
		// 	{
				springs[index] = '.';
				res += count_all_arrangements(springs, springsLen, condition, index, conditionIndex, conditionCount);
			// }
			springs[index] = '#';
			res += count_all_arrangements(springs, springsLen, condition, index, conditionIndex, conditionCount);
			springs[index] = '?';
			return (res);
		// }
	}
	else
	{
		if (index == springsLen)
			return (conditionIndex == condition.size || (conditionIndex == condition.size - 1 && conditionCount == condition.tab[conditionIndex]));
		else
		{
			if (springs[index] == '#')
			{
				if (conditionIndex == condition.size || conditionCount + 1 > condition.tab[conditionIndex])
					return (0);
				else
					return count_all_arrangements(springs, springsLen, condition, index + 1, conditionIndex, conditionCount + 1);
			}
			else
			{
				if (conditionCount != 0)
				{
					if (conditionCount < condition.tab[conditionIndex])
						return (0);
					else
						return count_all_arrangements(springs, springsLen, condition, index + 1, conditionIndex + 1, 0);
					}
				else
					return count_all_arrangements(springs, springsLen, condition, index + 1, conditionIndex, 0);
			}
		}
	}
}
