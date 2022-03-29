import styled from 'styled-components'

export const PaginationWrapper = styled.ul`
  list-style: none;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
`

export const PaginationItem = styled.li`
  display: inline-block;
  padding: 0 8px;
  margin-right: 8px;
  width: 32px;
  height: 32px;
  color: rgba(0, 0, 0, 0.65);
  font-family: Arial;
  line-height: 32px;
  text-align: center;
  border-radius: 2px;
  border: 1px solid rgb(217, 217, 217);
  box-sizing: border-box;
  &.show-more {
    padding: 0 0;
    color: rgba(0, 0, 0, 0.25);
    border: none;
    letter-spacing: 2px;
  }
  &:hover {
    color: rgb(24, 144, 255);
    border-color: rgb(24, 144, 255);
    cursor: pointer;
  }
  &.disabled {
    color: rgba(0, 0, 0, 0.25);
    pointer-events: none;
    &:hover {
      border-color: rgba(0, 0, 0, 0.25);
    }
  }
  &.active {
    color: rgb(24, 144, 255);
    border-color: rgb(24, 144, 255);
  }
`
