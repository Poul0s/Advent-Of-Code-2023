/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   header.h                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: psalame <psalame@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/12 18:57:53 by psalame           #+#    #+#             */
/*   Updated: 2023/12/12 19:55:16 by psalame          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef HEADER_H
# define HEADER_H
#include "libft.h"
#include <stdio.h>
#include <fcntl.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

typedef struct s_condition
{
	int	*tab;
	int	size;
}		t_condition;

char	*parseSprings(char *data);
t_condition	parseCondition(char *str);
unsigned long long count_all_arrangements(char *springs, int springsLen, t_condition condition, int index);

#endif