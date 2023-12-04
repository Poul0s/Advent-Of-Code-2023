/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: psalame <psalame@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/01 10:06:39 by psalame           #+#    #+#             */
/*   Updated: 2023/12/01 10:22:28 by psalame          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"
#include <stdbool.h>

int	parse_number(char *str)
{
	if (ft_isdigit(*str))
		return (*str - '0');
	if (ft_strncmp("one", str, 3) == 0)
		return (1);
	if (ft_strncmp("two", str, 3) == 0)
		return (2);
	if (ft_strncmp("three", str, 5) == 0)
		return (3);
	if (ft_strncmp("four", str, 4) == 0)
		return (4);
	if (ft_strncmp("five", str, 4) == 0)
		return (5);
	if (ft_strncmp("six", str, 3) == 0)
		return (6);
	if (ft_strncmp("seven", str, 5) == 0)
		return (7);
	if (ft_strncmp("eight", str, 5) == 0)
		return (8);
	if (ft_strncmp("nine", str, 4) == 0)
		return (9);
	return (-1);
}

int	get_line_number(char *str)
{
	int		first;
	int		last;
	int		nb;
	bool	is_first;

	first = 0;
	last = 0;
	is_first = true;
	while (*str)
	{
		nb = parse_number(str);
		if (nb != -1)
		{
			if (is_first)
				first = nb;
			is_first = false;
			last = nb;
		}
		str++;
	}
	return (first * 10 + last);
}

void	main(void)
{
	int		sum;
	char	*line;

	sum = 0;
	line = get_next_line(0);
	while (line)
	{
		sum += get_line_number(line);
		free(line);
		line = get_next_line(0);
	}
	ft_printf("%d\n", sum);
}
