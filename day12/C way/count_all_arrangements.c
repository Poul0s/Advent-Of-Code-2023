/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   count_all_arrangements.c                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: psalame <psalame@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/12 19:24:45 by psalame           #+#    #+#             */
/*   Updated: 2023/12/12 19:55:32 by psalame          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"
#include <stdbool.h>

static bool is_possibility(char *springs, int springsLen, t_condition condition, int index)
{
	int checkingDataIndex = 0;
	int checkingDataCurrentNb = 0;
	int i = 0;

	while (i < springsLen && i < index + 1)
	{
		if (springs[i] == '#')
		{
			if (checkingDataIndex >= condition.size)
				return (false);
			checkingDataCurrentNb++;
			if (checkingDataCurrentNb > condition.tab[checkingDataIndex])
				return (false);
		}
		else
		{
			if (checkingDataCurrentNb != 0)
			{
				if (checkingDataCurrentNb < condition.tab[checkingDataIndex])
					return (false);
				checkingDataIndex++;
				checkingDataCurrentNb = 0;
			}
		}
		i++;
	}
	if (index == springsLen - 1)
	{
		if (checkingDataIndex == condition.size - 1 && checkingDataCurrentNb == condition.tab[checkingDataIndex])
			return (true);
		else if (checkingDataIndex == condition.size && checkingDataCurrentNb == 0)
			return (true);
		return (false);
	}
	else
		return (true);

}

unsigned long long count_all_arrangements(char *springs, int springsLen, t_condition condition, int index)
{
	if (springs[index] == '?')
	{
		unsigned long long res = 0;
		int	i;
		for (i = 0; i < 2; i++)
		{
			springs[index] = (i == 0 ? '#' : '.');
			if (is_possibility(springs, springsLen, condition, index))
			{
				if (index == springsLen - 1)
					res++;
				else
					res += count_all_arrangements(springs, springsLen, condition, index + 1);
			}
		}
		springs[index] = '?';
		return (res);
	}
	else
	{
		if (index == springsLen - 1)
		{
			if (is_possibility(springs, springsLen, condition, index))
				return (1);
			else
				return (0);
		}
		else
			return count_all_arrangements(springs, springsLen, condition, index + 1);
	}
}