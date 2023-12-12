/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parseSprings.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: psalame <psalame@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/12 19:01:25 by psalame           #+#    #+#             */
/*   Updated: 2023/12/12 19:53:13 by psalame          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"

char	*parseSprings(char *data)
{
	char	*res;
	int		resLen = 0;
	int		i;

	resLen = strlen(data) * 5 + 4;
	res = malloc((resLen + 1) * sizeof(char));
	if (res == NULL)
	{
		printf("Error, not enough memory space\n");
		exit(EXIT_FAILURE);
	}
	for (i = 0; i < 5; i++)
	{
		strcpy(res + (i * strlen(data)) + i, data);
		res[(i + 1) * strlen(data) + i] = '?';
	}
	res[resLen] = 0;
	return (res);
}
