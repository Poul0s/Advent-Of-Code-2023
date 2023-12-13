# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: psalame <psalame@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/12/12 19:35:19 by psalame           #+#    #+#              #
#    Updated: 2023/12/13 16:08:59 by psalame          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

CC		=	cc

CFLAGS	=	-Wall -Wextra -Werror -g

SRC		=	main.c \
			parseSprings.c \
			parseCondition.c \
			count_all_arrangements.c \

OBJ		=	$(addprefix obj/, $(SRC:.c=.o))

OBJ_DIR	=	$(sort $(dir $(OBJ)))

NAME	=	Part2bis

LIBFT_PATH	=	libft

LIBFT		=	$(LIBFT_PATH)/libft.a

all: $(NAME)

$(NAME): $(LIBFT) $(OBJ_DIR) $(OBJ)
	$(CC) $(CFLAGS) $(OBJ) -lft -L$(LIBFT_PATH) -o $(NAME)

$(LIBFT):
	make -C $(LIBFT_PATH)

obj/%.o: %.c
	$(CC) $(CFLAGS) $^ -I$(LIBFT_PATH)/header -o $@ -c

$(OBJ_DIR):
	mkdir -p $@

clean:
	rm -rf $(OBJ)
	make -C $(LIBFT_PATH) clean

fclean: clean
	rm -rf $(NAME)
	make -C $(LIBFT_PATH) fclean

re: fclean all

.PHONY: all clean fclean re
