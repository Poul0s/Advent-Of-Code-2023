/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parseCondition.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: psalame <psalame@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/12 19:10:48 by psalame           #+#    #+#             */
/*   Updated: 2023/12/12 19:53:18 by psalame          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"

static int getTotalOfNumber(char *str)
{
	int total = 0;
	int	i = 0;
	while (str[i])
	{
		if (str[i] == ',')
			total++;
		i++;
	}
	return (total + 1);
}

t_condition	parseCondition(char *str)
{
	t_condition	res;
	int			totalNumber = getTotalOfNumber(str);
	int			i;

	res.tab = malloc(totalNumber * 5 * sizeof(int));
	if (res.tab == NULL)
	{
		printf("Error, not enough memory space\n");
		exit(EXIT_FAILURE);
	}
	res.size = totalNumber * 5;
	i = 0;
	while (i <= totalNumber && *str)
	{
		while (*str == ',')
			str++;
		if (*str)
		{
			res.tab[i++] = atoi(str);
			while (isdigit(*str))
				str++;
		}
	}
	while (i < res.size)
	{
		res.tab[i] = res.tab[i % totalNumber];
		i++;
	}
	return (res);
}
